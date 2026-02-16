interface DashBoardNotifys {
  no:number
}
const DashboardNotify:React.FC<DashBoardNotifys> = ({no}) => {
  return (
    <div className="bg-white border-2 border-amber-300 w-[93%] p-5 m-2 rounded-lg md:w-[470px]">
      <div className="flex item-center justify-between">
        <span>Groups Invited</span>
<span className="material-symbols-outlined text-yellow-400">
person
</span>
      </div>
      <h2 className="font-bold text-2xl">{no}</h2>
    </div>
  );
};

export default DashboardNotify;
