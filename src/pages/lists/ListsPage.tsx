import { Lists } from './Lists';
import { ListsHeader } from './ListsHeader';
import { PageLayout } from './PageLayout';

export const ListsPage = () => {
  return (
    <>
      <ListsHeader />
      <PageLayout>
        <Lists />
      </PageLayout>
    </>
  );
};
