import { auth } from "@clerk/nextjs";
const OrganizationIdPage = () => {
  const { userId, orgId } = auth();
  console.log(userId, orgId);
  return <div>xin chao</div>;
};
export default OrganizationIdPage;
