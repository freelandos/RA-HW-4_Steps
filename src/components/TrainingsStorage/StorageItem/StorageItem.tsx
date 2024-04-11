import moment from 'moment';

type StorageItemProps = {
    date: string;
    distance: number;
    removeItem: (date: string) => void;
};

export function StorageItem(props: StorageItemProps) {
  const { date, distance, removeItem } = props;
  const formatedDate = moment(date).format('DD.MM.YYYY');

  return (
    <div className="storage_item">
      <div>{formatedDate}</div>
      <div>{distance}</div>
      <div className="remove_item_button" onClick={() => removeItem(date)}>✘</div>
    </div>
  );
}
