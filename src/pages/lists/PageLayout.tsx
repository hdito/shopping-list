import { Outlet, useParams } from "react-router-dom";
import { list } from "../../types/list";
import { ManageAccessMenu } from "./ManageAccessMenu";

export const PageLayout = ({
  isManageAccess,
  onManageAccess,
}: {
  isManageAccess: list | null;
  onManageAccess: (list: list | null) => void;
}) => {
  const params = useParams();
  return (
    <>
      <main
        className={`${
          !params?.id && isManageAccess && "pointer-events-none"
        } flex-1 max-w-prose flex flex-col items-center gap-2 w-full`}
      >
        <Outlet />
      </main>
      {isManageAccess && (
        <ManageAccessMenu
          onClose={() => onManageAccess(null)}
          isManageAccess={isManageAccess}
        />
      )}
    </>
  );
};
