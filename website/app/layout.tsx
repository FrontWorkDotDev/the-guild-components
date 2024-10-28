import { FC } from 'react';
import { GuildLayout } from '@theguild/components';
import '@theguild/components/style.css';
import { Metadata } from 'next';
import { getPageMap } from '@theguild/components/nextra';

export const metadata: Metadata = getDefaultMetadata({
  description: 'Documentation for The Guild',
  websiteName: 'Guild Docs',
});

function getDefaultMetadata({
  websiteName,
  description = `${websiteName} Documentation`,
}: {
  description?: string;
  websiteName: string;
}): Metadata {
  return {
    description,
    title: {
      // Use `absolute` title if `metadata.title` was not provided in the page
      absolute: websiteName,
      template: `%s | ${websiteName}`,
    },
  };
}

const logo = (
  <svg viewBox="0 0 50 54" height="36" fill="#1cc8ee" className="mr-1.5">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.02821 17.9612C0.79364 17.2557 0 15.933 0 14.4338C0 12.2293 1.85189 10.3774 4.05647 10.3774C4.67376 10.3774 5.20285 10.4656 5.64377 10.7302L22.6632 0.941839C23.4568 0.500922 24.4268 0.236328 25.3087 0.236328C26.2787 0.236328 27.1605 0.500922 27.9542 0.941839L42.4163 9.31927C41.3581 10.0247 40.5644 11.0829 40.0353 12.3174L26.0141 4.20459C25.7496 4.02822 25.4851 4.02826 25.2205 4.02826C24.956 4.02826 24.6914 4.1164 24.4268 4.20459L7.84835 13.7284C7.84835 13.993 7.93651 14.1693 7.93651 14.4338C7.93651 16.1975 6.79013 17.6085 5.29101 18.2258C5.20283 18.2258 5.02649 18.3139 4.93831 18.3139H4.85009C4.76191 18.3139 4.58557 18.4021 4.49739 18.4021H4.40917C4.23281 18.4021 4.14462 18.4021 3.96826 18.4021C3.79189 18.4021 3.61554 18.4021 3.43918 18.4021H3.35096C3.26278 18.4021 3.08644 18.4021 2.99826 18.3139H2.91004C2.64549 18.2258 2.29276 18.1376 2.02821 17.9612ZM50.0001 14.4338C50.0001 15.6684 49.471 16.7266 48.5891 17.4321V36.5679C48.5891 38.5079 47.5309 40.2716 45.9436 41.2417L31.4815 49.5309C31.4815 48.2082 31.0406 46.8854 30.2469 45.9154L44.0036 37.9789C44.5327 37.7144 44.7972 37.1852 44.7972 36.5679V18.3139C43.1217 17.7848 41.8872 16.2857 41.8872 14.4338C41.8872 13.552 42.1517 12.7584 42.6808 12.0529C42.769 11.9648 42.8572 11.7884 42.9454 11.7002C43.2099 11.4356 43.3863 11.2593 43.6508 11.0829C43.6508 11.0829 43.739 11.0829 43.739 10.9947C43.8272 10.9065 43.9154 10.9065 44.0917 10.8183C44.0917 10.8183 44.18 10.8184 44.18 10.7302C44.3563 10.642 44.4445 10.6419 44.6209 10.5538C44.9736 10.4656 45.4145 10.3774 45.8554 10.3774C48.1482 10.3774 50.0001 12.2293 50.0001 14.4338ZM29.3651 49.7072C29.3651 49.8836 29.3651 50.1482 29.2769 50.3246V50.4128C28.9242 52.2646 27.3369 53.7637 25.3087 53.7637C23.545 53.7637 22.0459 52.6173 21.5168 51.03L4.76193 41.3298C3.08644 40.3598 2.11643 38.5962 2.11643 36.6562V20.3422C2.73371 20.5186 3.43919 20.6949 4.05647 20.6949C4.67376 20.6949 5.29104 20.6067 5.82014 20.4304V36.6562C5.82014 37.2734 6.17284 37.8025 6.61376 38.0671L22.3104 47.1499C23.0159 46.2681 24.1623 45.739 25.3968 45.739C26.7196 45.739 27.866 46.3563 28.6596 47.4145C28.6596 47.4145 28.6596 47.4145 28.6596 47.5027C28.7478 47.5908 28.7478 47.6791 28.836 47.7673C28.836 47.7673 28.836 47.8554 28.9242 47.8554C28.9242 47.9436 29.0124 48.0317 29.0124 48.0317C29.0124 48.0317 29.0124 48.12 29.1006 48.12C29.1006 48.2082 29.1888 48.2963 29.1888 48.2963C29.1888 48.3845 29.1887 48.3845 29.2769 48.4727C29.2769 48.5608 29.3651 48.5609 29.3651 48.6491C29.3651 48.7373 29.3651 48.7372 29.4533 48.8254C29.4533 48.9136 29.4533 48.9137 29.4533 49.0018C29.4533 49.09 29.4533 49.1781 29.4533 49.2663C29.4533 49.3545 29.4533 49.3546 29.4533 49.4428C29.3651 49.4428 29.3651 49.5309 29.3651 49.7072Z"
    />
    <path d="M18.2891 35V17.9375H23.7852C25.293 17.9375 26.6484 18.2812 27.8516 18.9688C29.0547 19.6484 29.9922 20.6133 30.6641 21.8633C31.3438 23.1055 31.6875 24.5 31.6953 26.0469V26.832C31.6953 28.3945 31.3633 29.7969 30.6992 31.0391C30.043 32.2734 29.1133 33.2422 27.9102 33.9453C26.7148 34.6406 25.3789 34.9922 23.9023 35H18.2891ZM22.4023 21.1133V31.8359H23.832C25.0117 31.8359 25.918 31.418 26.5508 30.582C27.1836 29.7383 27.5 28.4883 27.5 26.832V26.0938C27.5 24.4453 27.1836 23.2031 26.5508 22.3672C25.918 21.5312 24.9961 21.1133 23.7852 21.1133H22.4023Z" />
  </svg>
);

const RootLayout: FC<{
  children: React.ReactNode;
}> = async ({ children }) => {
  return (
    <GuildLayout
      logo={logo}
      layoutProps={{
        pageMap: await getPageMap(),
      }}
    >
      {children}
    </GuildLayout>
  );
};

export default RootLayout;
