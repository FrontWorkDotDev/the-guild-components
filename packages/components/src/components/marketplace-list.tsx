import { ReactElement, useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { cn } from '../cn';
import { IMarketplaceItemProps, IMarketplaceListProps } from '../types/components';
import { Anchor } from './anchor';
import { Heading } from './heading';
import { Image } from './image';
import { Tag, TagsContainer } from './tag';

const formatDate = (value: string): string => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date(value);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const numberFormat = Intl.NumberFormat('en-US', {
  notation: 'compact',
});

export const MarketplaceList = ({
  title,
  placeholder,
  items,
  pagination,
  className,
  colorScheme = 'neutral',
}: IMarketplaceListProps): ReactElement => {
  const [currentPage, setCurrentPage] = useState(0);

  const pageSize = pagination || 5;
  const pageCount = items ? Math.ceil(items.length / pageSize) : 1;

  useEffect(() => {
    // items change when search query is changed, so we need to reset currentPage to 0
    setCurrentPage(0);
  }, [items]);

  const pages = useMemo(() => {
    const itemsCopy = [...items];
    const pagesData = [];

    while (itemsCopy.length > 0) {
      pagesData.push(itemsCopy.splice(0, pageSize));
    }

    return pagesData;
  }, [items, pageSize]);

  return (
    <section
      className={cn(
        // --bg and --fg are defined in style.css under .MarketplaceSearch
        'MarketplaceSearch',
        colorScheme,
        'w-full dark:bg-neutral-900 [&.green]:bg-green-1000',
        className,
      )}
    >
      {title && (
        <Heading
          as="h2"
          size="sm"
          className="mb-6 mt-4 text-2xl/8 font-medium text-[--fg,theme(colors.neutral.900)] dark:text-white"
        >
          {title}
        </Heading>
      )}
      {pages[currentPage]?.length ? (
        <>
          <ul className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            {pages[currentPage].map((item, i) => {
              return (
                <li key={item.title} className="*:h-full">
                  <MarketplaceListItem
                    item={item}
                    tabIndex={i === 0 ? 0 : -1}
                    // focusgroup vertical navigation
                    onKeyDown={event => {
                      const ul = event.currentTarget.parentElement!.parentElement!;

                      const gridTemplateColumns = ul
                        .computedStyleMap()
                        .get('grid-template-columns')
                        ?.toString();

                      const columns =
                        parseInt(gridTemplateColumns?.match(/repeat\((\d)/)?.[1] as string) || 1;

                      moveFocusOnArrowKeys(event, columns);
                    }}
                  />
                </li>
              );
            })}
          </ul>
          {pageCount > 1 && (
            <ReactPaginate
              pageCount={pageCount}
              forcePage={currentPage}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              onPageChange={page => setCurrentPage(page.selected)}
              containerClassName="flex justify-center gap-2 mt-6"
              previousClassName="hidden"
              nextClassName="hidden"
              breakLinkClassName="hive-focus rounded text-[--fg-80] [.green_&]:text-green-200"
              pageLinkClassName="hive-focus text-sm font-medium rounded-lg [.green_&]:text-green-200 [.green_&]:border-green-700 border border-neutral-600 dark:text-neutral-200 size-7 flex justify-center items-center select-none"
              activeLinkClassName="text-[--bg] dark:!text-[--bg] bg-[--fg] [.green_&]:bg-green-300 [.green_&]:text-green-800"
            />
          )}
        </>
      ) : (
        <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-300">
          {placeholder}
        </div>
      )}
    </section>
  );
};

export interface MarketplaceListItemProps extends React.ComponentPropsWithoutRef<'a'> {
  item: IMarketplaceItemProps;
}

export function MarketplaceListItem({ item, ...rest }: MarketplaceListItemProps) {
  return (
    <Anchor
      {...item.link}
      {...rest}
      className={cn(
        'hive-focus flex gap-4 rounded-2xl border border-transparent bg-neutral-50 p-6 @container hover:border-neutral-200/50 hover:bg-neutral-100 @lg:gap-6 dark:bg-neutral-800 dark:hover:border-neutral-700 dark:hover:bg-neutral-700/50 [.green_&]:bg-green-900 [.green_&]:hover:border-green-700/50 [.green_&]:hover:bg-green-800/75',
        item.link.className,
      )}
    >
      <div
        className={cn(
          'size-16 shrink-0 rounded-lg bg-[--bg] @lg:size-16 @2xl:size-[92px] [.green_&]:[background:linear-gradient(135deg,_#68A8B6_0%,_#3B736A_100%)]',
        )}
      >
        <Image
          {...item.image}
          placeholder={item.image.placeholder || 'empty'}
          width="92"
          height="92"
          className="aspect-square rounded-lg object-contain ring-inset ring-1 ring-[rgb(from_var(--fg)_r_g_b_/_0.1)]"
        />
      </div>
      <div className="flex flex-col">
        <h3 className="m-0 line-clamp-2 font-medium text-[--fg] @lg:text-2xl">{item.title}</h3>
        <div className="mb-2 line-clamp-3 text-sm text-[--fg-80] @lg:text-base">
          {item.description}
        </div>
        {item.tags && item.tags.length > 0 && (
          <TagsContainer className="mt-auto">
            {item.tags.map(tagName => (
              <Tag key={tagName}>{tagName}</Tag>
            ))}
          </TagsContainer>
        )}
        <div className="flex flex-wrap gap-x-4 text-xs text-[--fg-80] @lg:text-sm">
          <span>
            Updated <time dateTime={item.update}>{formatDate(item.update)}</time>
          </span>
          {item.weeklyNPMDownloads && (
            <span className="hidden @sm:block">
              {numberFormat.format(item.weeklyNPMDownloads)} weekly downloads
            </span>
          )}
        </div>
      </div>
    </Anchor>
  );
}

function moveFocusOnArrowKeys(event: React.KeyboardEvent<HTMLAnchorElement>, columns: number) {
  let listItem: Element | null | undefined;

  const move = ({ ArrowDown: '⬇', ArrowUp: '⬆', ArrowRight: '➡️', ArrowLeft: '⬅️' } as const)[
    event.key
  ];

  if (!move) return;

  if (move === '⬅️') {
    const parent = event.currentTarget.parentElement;
    if (parent) {
      listItem = parent.previousElementSibling;
    }
  } else if (move === '➡️') {
    const parent = event.currentTarget.parentElement;
    if (parent) {
      listItem = parent.nextElementSibling;
    }
  } else {
    listItem = event.currentTarget.parentElement;

    while (columns > 0 && listItem) {
      if (move === '⬆') {
        columns--;
        listItem = listItem.previousElementSibling;
      } else if (move === '⬇') {
        columns--;
        listItem = listItem.nextElementSibling;
      }
    }
  }

  if (listItem && listItem instanceof HTMLElement && listItem.tagName === 'LI') {
    const anchor = listItem.querySelector('a');
    if (anchor) {
      anchor.focus();
      event.preventDefault();
    }
  }
}
