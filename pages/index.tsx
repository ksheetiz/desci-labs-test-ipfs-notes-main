import Head from "next/head";
import { Inter } from "@next/font/google";
import { useCallback, useState } from "react";
import axios from "axios";
import { BasicIpfsData } from "./api/ipfs";
import Container from "./components/Container";
import Navbar from "./components/navbar/Navbar";
import NotesModal from "./components/modal/NotesModal";
import NotesCard from "./components/notes/NotesCard";
import Button from "./components/Button";
import useNotesModal from "./hooks/useNotesModal";
import { create } from "ipfs-http-client";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [note, setNote] = useState <BasicIpfsData[]>([]);
  const [txt, setTxt] = useState("");
  const notesModal = useNotesModal();

  let ipfs : any = null;

  const getClient = async() => {
    if(ipfs === null)
      ipfs = create();

      return ipfs;
  }

  const handleLoad = async () => {
    setLoading(true);

    let client =  await getClient();

    let temp = localStorage.getItem("notes")

    if(temp !== null){
      let retArray = JSON.parse(temp);
      setNote(note.concat(retArray))

      // for(let x in note){
      //   let asyncitr = client.cat(note[x].cid);
      //   let data = "";
      //   for await (const itr of asyncitr){
      //     data = data.concat(Buffer.from(itr).toString());
      //   }
      //   let temp_data = {
      //     content : data, cid : note[x].cid
      //   }
      //   setResult([...result,temp_data])
      // }
    }
    setLoading(false);
  };

  const setData = async(data : any) => {
    setNote([...note,data]);
  }

  const setLocalData = async(data : any) => {
    localStorage.setItem("notes",data)
  }

  const handleSubmit =  useCallback(async() => {
    setLoading(true);

    let res = {txt} 

    const { data } = await axios.post("/api/ipfs",res);

    await setData(data);

      await setLocalData(JSON.stringify(note));

      setLoading(false);

      notesModal.onClose();
    
  },[setData])

  // avoiding ternary operators for classes
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <Head>
        <title>IPFS Notes</title>
        <meta name="description" content="IPFS Notes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <NotesModal txt={txt} setTxt={setTxt} handleLoad = {handleSubmit}/>
      <Container>
        <div className="pt-24 pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {note.length > 0 && (
              note.map((item) => (
              <NotesCard cid={item.cid} content={item.content} key={item.cid}/>
              ))
            )}
        </div>
        <Button onClick={handleLoad} label={`${loading ? "Loading ..." : "Retrieve Data"}`}/>
      </Container>
    </>
  );
}


{/* <div className="flex flex-col">
              <span>Content: {result.content}</span>
              <span>CID: {result.cid}</span>
            </div> */}