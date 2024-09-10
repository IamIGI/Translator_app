export type ObjectWithDate = { date: Date; [key: string]: unknown };

function sortByDate(
  array: ObjectWithDate[],
  sortOrder: 'newest' | 'oldest' = 'newest'
): ObjectWithDate[] {
  if (sortOrder !== 'oldest' && sortOrder !== 'newest') {
    console.error('Could not sort by provided order type: ', sortOrder);
    sortOrder = 'newest';
  }

  if (sortOrder === 'newest') {
    return array.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } else {
    return array.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
}

export default { sortByDate };
