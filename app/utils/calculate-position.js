/**
 * Calculate the new position of the item at index i in a given list.
 * The position is the medium between the position of the previous and next item.
*/
export default function calculatePosition(list, i) {
  const prevPosition = i > 0 ? list[i - 1].position : 0;
  const lastIdx = list.length - 1;
  const nextPosition = i < lastIdx ? list[i + 1].position : list[lastIdx - 1].position + 2;
  return (prevPosition + nextPosition) / 2;
}
