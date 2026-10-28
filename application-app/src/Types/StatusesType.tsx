export type StatusesType = {
  Saved: boolean;
  Applied: boolean;
  Interview: boolean;
  Offered: boolean;
  Rejected: boolean;
};

export type StatusProps = {
  statuses: StatusesType;
  setStatuses: React.Dispatch<React.SetStateAction<StatusesType>>;
};
