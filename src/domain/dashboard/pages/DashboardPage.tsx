import { useTranslation } from 'react-i18next';

const DashboardPage = () => {
  const { t } = useTranslation();

  return <div>{t('welcome')}</div>;
};

export default DashboardPage;
