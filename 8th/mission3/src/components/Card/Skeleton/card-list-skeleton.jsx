import CardSkeleton from "./card-skeleton";

const CardListSkeleton = ({ number }) => {
  return new Array(number).fill(0).map((_, i) => <CardSkeleton key={i} />);
};

export default CardListSkeleton;
