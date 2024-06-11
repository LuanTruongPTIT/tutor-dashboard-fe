import { redirect } from "next/navigation";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};
const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;
const BAD_REQUEST_ERROR = 400;
const NOT_FOUND_ERROR = 404;
enum HttpStatusCode {
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  // các mã lỗi khác
}
type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};
type BadRequesError = {
  message: string;
  status: number;
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}
export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;
  constructor({ status, payload }: { status: 422; payload: any }) {
    super({ status, payload });
    this.payload = payload;
    this.status = status;
  }
}
export class BadRequestError extends HttpError {
  status: 400;
  payload: BadRequesError;
  constructor({ status, payload }: { status: 400; payload: any }) {
    super({ status, payload });
    this.payload = payload;
    this.status = status;
  }
}
export class NotFoundError extends HttpError {
  status: 404;
  constructor({ status, payload }: { status: 404; payload: any }) {
    super({ status, payload });
    this.status = status;
  }
}
const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
class AccessToken {
  private token = "";
  private _expiresAt = new Date().toISOString();
  get value() {
    return this.token;
  }
  set value(token: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === "undefined") {
      throw new Error("Cannot set token on server side");
    }
    this.token = token;
  }
  get expiresAt() {
    return this._expiresAt;
  }
  set expiresAt(expiresAt: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === "undefined") {
      throw new Error("Cannot set token on server side");
    }
    this._expiresAt = expiresAt;
  }
}
export const accessToken = new AccessToken();
let clientLogoutRequest: null | Promise<any> = null;
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  console.log(accessToken.value, accessToken.expiresAt);
  const body = options?.body
    ? options?.body
      ? options.body instanceof FormData
        ? options.body
        : JSON.stringify(options.body)
      : undefined
    : undefined;

  const baseHeaders =
    body instanceof FormData
      ? {
          Authorization: accessToken?.value
            ? `Bearer ${accessToken?.value}`
            : "",
        }
      : {
          "Content-Type": "application/json",
          Authorization: accessToken?.value
            ? `Bearer ${accessToken?.value}`
            : "",
        };

  const baseUrl =
    options?.baseUrl === undefined ? "http://localhost:8001" : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });

  const payload = await res.json();

  const data = {
    status: res.status,
    payload,
  };
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    } else if (res.status === BAD_REQUEST_ERROR) {
      throw new BadRequestError(
        data as {
          status: 400;
          payload: BadRequesError;
        }
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (typeof window !== "undefined") {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch("http://localhost:3000/api/auth/logout", {
            method: "POST",
            body: JSON.stringify({ force: true }),
            headers: {
              ...baseHeaders,
            } as any,
          });
        }
        await clientLogoutRequest;
        localStorage.removeItem("profile");
        clientLogoutRequest = null;
        location.href = "/";
      } else if (Number(res.status) === 404) {
        throw new NotFoundError(data as { status: 404; payload: any });
      } else {
        const accesstoken = (options?.headers as any)?.Authorization.split(
          "Bearer"
        )[1];

        redirect(`/logout?accesstoken=${accesstoken}`);
      }
    }
  }
  return data;
};
