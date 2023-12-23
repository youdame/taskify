import { InviteBoard, Member, Tableindex } from "@/components/Table/Table.type";
import TableIndex from "@/components/Table/TableIndex/TableIndex";
import TableList from "@/components/Table/TableList/TableList";
import HideButton from "@/components/Table/TablePagenation/HideButton";
import InviteButton from "@/components/Table/TablePagenation/InviteButton";
import SearchInput from "@/components/Table/TablePagenation/SerachInput";
import ArrowButton from "@/components/buttons/ArrowButton/ArrowButton";
import { clsx } from "clsx";
import { useMemo, useState } from "react";
import styles from "./TablePagenation.module.css";

interface TableProps {
  title: string;
  data: Member[] | InviteBoard[];
  row?: number;
  tableindex: Tableindex;
  invite?: boolean;
  search?: boolean;
}

const TablePagenation = ({ title, data, row = Infinity, tableindex, invite = false, search = false }: TableProps) => {
  const entirePageNum = Math.ceil(data.length / row);
  const [pageCount, setPageCount] = useState(1);
  const [rowNum, setRowNum] = useState(row);
  const [keyword, setKeyword] = useState("");
  const rowData = useMemo(
    () =>
      keyword
        ? data.filter((v) => {
            if ("dashboard" in v) {
              return [v.dashboard.title, v.invitee.nickname, v.invitee.email].some((v) => v.includes(keyword));
            }
            if ("nickname" in v) {
              return v.nickname.includes(keyword);
            }
          })
        : data.slice(rowNum - row, rowNum),
    [data, row, rowNum, keyword]
  );
  const [isOpen, setIsOpen] = useState(true);
  const isAccept = Object.values(tableindex).includes("acceptButton");

  return (
    <article className={styles.container}>
      <div className={styles.title}>
        <h2 className={styles.title__text}>{title}</h2>
        {entirePageNum > 1 && (
          <div className={clsx(styles.pagecount, isAccept && styles.pagecount__mobile)}>
            <span className={styles.pagecount__text}>{`${pageCount} 페이지 중 ${entirePageNum}`}</span>
            <ArrowButton
              disabled={pageCount === 1}
              onClick={() => {
                setPageCount((prev) => (prev > 1 ? prev - 1 : 1));
                setRowNum((prev) => (prev - row > 0 ? prev - row : prev));
              }}
            />
            <ArrowButton
              right
              disabled={pageCount === entirePageNum}
              onClick={() => {
                setPageCount((prev) => (prev < entirePageNum ? prev + 1 : prev));
                setRowNum((prev) => (prev < data.length ? prev + row : prev));
              }}
            />
          </div>
        )}
        {invite && <InviteButton />}
      </div>
      {isOpen && (
        <>
          {search && <SearchInput keyword={keyword} setKeyword={setKeyword} />}
          <TableIndex data={rowData} tableindex={tableindex} invite={invite} />
          <TableList data={rowData} tableindex={tableindex} row={row} />
        </>
      )}
      <HideButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </article>
  );
};

export default TablePagenation;
