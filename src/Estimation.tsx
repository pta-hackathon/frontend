import React, { useState } from "react";
import { client, type Estimation, type User } from "./api";
import { TICKET_ID } from "./Ticket";

const MIN = 0;
const MAX = 20;

const normalize = (val: number) => {
  return ((val - MIN) / (MAX - MIN)) * 100;
};

const min = (e: Estimation) => e.minVal || MIN;
const max = (e: Estimation) => e.maxVal || MAX;

const userIdToColor = (id: number) => {
  const colors = ["red", "blue", "yellow", "purple", "pink"];
  return colors[id % colors.length];
};

const Estimation = ({ user, users }: { user: User | null; users: User[] }) => {
  const otherUsers = users.filter((u) => u.name !== user?.name);
  const [estimations, setEstimations] = useState<Estimation[]>([
    { id: 1, idUser: 1, minVal: 2, maxVal: 5 },
    { id: 2, idUser: 2, minVal: 4, maxVal: 12 },
    { id: 3, idUser: 3, minVal: 1, maxVal: 2 },
    { id: 4, idUser: 4, minVal: 5, maxVal: 16 },
  ]);
  const [minVal, setMinVal] = useState<number>(1);
  const [maxVal, setMaxVal] = useState<number>(2);
  const [tipEstimation, setTipEstimation] = useState<Estimation | undefined>(undefined);
  const [tipUser, setTipUser] = useState<number | undefined>(undefined);

  const dialogRef = React.useRef<HTMLDialogElement>(null);

  const showDialog = (e: Estimation) => () => {
    if (e.idUser === user?.id) return;
    setTipEstimation(e);
    dialogRef.current?.showModal();
  };

  const sendTip = () => async () => {
    if (tipEstimation === undefined) return;
    await client.POST("/rateschaetzer", {
      params: {
        query: {
          user: user?.name || "",
          tipuser: users.find((u) => u.id === tipUser)?.name || "",
          idticket: TICKET_ID,
          idschaetzung: tipEstimation.id || 0,
        },
      },
    });
    dialogRef.current?.close();
  };

  return (
    <>
      <div className="rounded bg-white">
        <h2 className="p-2 text-center text-2xl font-semibold">Schätzungen</h2>
        <div className="flex flex-col gap-1 p-4">
          <div className="flex justify-between font-bold">
            <span>{MIN}</span>
            <span>{(MAX - MIN) * 0.25 + MIN}</span>
            <span>{(MAX - MIN) * 0.5 + MIN}</span>
            <span>{(MAX - MIN) * 0.75 + MIN}</span>
            <span>{MAX}</span>
          </div>
          {estimations.map((e) => (
            <div
              key={e.id}
              className="rounded border border-black hover:opacity-60"
              style={{
                marginLeft: normalize(min(e)) + "%",
                width: normalize(max(e) - min(e) + MIN) + "%",
                backgroundColor: userIdToColor(e.idUser || 0),
                height: e.idUser === user?.id ? "2rem" : "1rem",
                cursor: e.idUser === user?.id ? "default" : "pointer",
              }}
              onClick={showDialog(e)}
            ></div>
          ))}
        </div>
      </div>
      <div className="mx-12 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-white">Minimaler Aufwand:</span>
          <input
            type="number"
            value={minVal}
            onChange={(e) => setMinVal(Number(e.target.value))}
            max={maxVal - 1}
            min={MIN}
            className="input w-24"
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-white">Maximaler Aufwand:</span>
          <input
            type="number"
            value={maxVal}
            onChange={(e) => setMaxVal(Number(e.target.value))}
            min={minVal + 1}
            max={MAX}
            className="input w-24"
          />
        </div>
        <button className="btn">Update Schätzung</button>
      </div>
      <dialog ref={dialogRef} className="rounded border bg-white p-4">
        <div className="flex w-64 flex-col gap-2">
          <h2 className="text-xl">
            Tipp User{" "}
            <span className="capitalize" style={{ background: userIdToColor(tipEstimation?.idUser || 0) }}>
              {userIdToColor(tipEstimation?.idUser || 0)}
            </span>
          </h2>
          <select className="select" value={tipUser} onChange={(e) => setTipUser(Number(e.target.value))}>
            {otherUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <div className="flex justify-center gap-2">
            <button className="btn" onClick={() => dialogRef.current?.close()}>
              Cancel
            </button>
            <button className="btn" onClick={sendTip()}>
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Estimation;
