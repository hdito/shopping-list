import { useState } from 'react';
import { list } from '../../types/list';
import { ListHeader } from '../list/ListHeader';
import { Lists } from './Lists';
import { ListsHeader } from './ListsHeader';
import { ManageAccessMenu } from './ManageAccessMenu';
import { PageLayout } from './PageLayout';

export const ListsPage = () => {
  const [isManageAccess, setIsManageAccess] = useState<list | null>(null);
  return (
    <>
      <ListsHeader isManageAccess={isManageAccess} />
      <PageLayout>
        <Lists onManageAccess={setIsManageAccess} />
      </PageLayout>
      {isManageAccess && (
        <ManageAccessMenu
          onClose={() => setIsManageAccess(null)}
          isManageAccess={isManageAccess}
        />
      )}
    </>
  );
};
