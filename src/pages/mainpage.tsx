import React, { useEffect, useRef, useState } from "react";

const MainPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [groupname, setgroupname] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [dateTime, setDateTime] = useState("");
//   const [minute, setminute] = useState<string>("");
  const [hidden, setishidden] = useState<boolean>(true);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };
  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const date = dateTime;
const changedDate = new Date(date);
    console.log({
      group: groupname,
      file: file,
      date:   changedDate.toISOString(),
    //   minute: minute,
    });
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("username", groupname);
    formData.append("file", file);
    formData.append("dateTime", dateTime); // Include the date-time value
    // formData.append("dateTime", minute); // Include the date-time value

    try {
      const response = await fetch("https://your-api.com/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Upload response:", result);
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };
  useEffect(() => {
    dialogRef.current?.close();
  }, []);
  return (
    <div className="w-[90%] bg-[#edefff]">
      <div>
        <h2 className="font-bold text-2xl mt-5">Dashboard</h2>
      </div>
      <div className="flex justify-between items-center -mt-5">
        <span>Manage your groups and collaborations</span>
        <button
          className="bg-gradient-to-r from-blue-500 to-pink-400 text-white p-2 w-[150px] mt-4 font-bold ml-4 mr-4 mb-4 rounded-lg "
          onClick={() => {
            openDialog();
            setishidden(false);
          }}
        >
          Create Group +
        </button>
      </div>

      <div>
      
      </div>
      <div>
        <span>contact_logo</span>
        <h2>Group Invitations</h2>
        <div>3 Pending</div>
      </div>
      <div className="card-wrappers">
      </div>

      <dialog
        hidden={hidden}
        className="w-[700px] ml-80 mt-[200px]  justify-center  flex flex-col"
        ref={dialogRef}
      >
        <div className="flex justify-end p-2 bg-red">
          <button
            className="bg-gray-200 rounded-full w-[20px] h-[20px] flex items-center justify-center"
            onClick={() => {
              closeDialog();
              setishidden(true);
            }}
          >
            x
          </button>
        </div>
        <h2 className="text-2xl font-bold ml-2">Create New Group</h2>
        <span className="ml-2 text-gray-400">
          Setup new collaboration group with your team members
        </span>

        <div className="mt-5">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <h3 className="pb-2 ml-2 font-bold ">Group Name *</h3>
              <input
                className="pb-2 border-1 border-gray-200 ml-2 mr-2 rounded-sm"
                type="text"
                placeholder="Eg. React Group"
                onChange={(e) => {
                  setgroupname(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-col mb-2">
              <h3 className="pb-2 ml-2 font-bold ">Group Resources *</h3>
              <input
                className="pb-2 border-1"
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) setFile(e.target.files[0]);
                }}
              />
            </div>
            <div className="flex flex-col mb-2">
              <h3 className="pb-2 ml-2 font-bold">Pick Date*</h3>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="ml-2 pb-2 border-1 border-gray-200"
              />
            </div>
            {/* <div className="flex flex-col">
              <h3 className="font-bold ml-2">Session Timer*</h3>
              <div className="flex">
                <div className="flex flex-col">
                  <input
                    type="time"
                    className="ml-2"
                    onChange={(e) => {
                      setminute(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div> */}
            <div className="flex justify-end m-2">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-lg font-bold"
                onClick={() => {}}
              >
                {" "}
                submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MainPage;
