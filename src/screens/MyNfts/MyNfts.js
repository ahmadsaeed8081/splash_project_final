import React, { useEffect, useState } from "react";
import NftProduct from "../../components/NftProduct/NftProduct";
import MyCard from "../../components/MyCard/MyCard";
import ReactPaginate from "react-paginate";
import { CiSearch } from "react-icons/ci";
import { t } from "i18next";
import Web3 from "web3";
import {
  cont_address,
  cont_abi,
} from "../../components/config";
import { useAccount, useDisconnect } from 'wagmi'

const MyNfts = () => {
  const [allNfts, set_allNfts] = useState([]);
  const [availbleNfts, set_available_nfts] = useState([]);
  const { address, isConnected,isConnecting ,isDisconnected} = useAccount()

  const data = [ ];
  let count=0;

async function mount(){
if(count>0)
{
  return;
}
count++;
const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai-bor.publicnode.com"));
  
  const contract = new web3.eth.Contract(cont_abi, cont_address);

  
  let mintedList_arr = await contract.methods.get_myAllNFTs().call({from: address});

  for(let i=0; i < mintedList_arr.length;i++)
  {

        let img= ("./images/"+mintedList_arr[i]+".png")
        data.push(
        {
        id: mintedList_arr[i],
        title: "SLASH "+mintedList_arr[i],
        price: "80 USDT",
        image: img,
        })
  }
  
  set_allNfts(data)
  set_available_nfts(data.length)
}

useEffect(()=>{
  mount();
  },[])
  
    
  const [users, setUsers] = useState(data.slice(0, 51));
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);

  return (
    <div className="bg-[#F5F5F5] pb-32 pt-12">
      <div className="container mx-auto ">

        <div className=" flex   justify-between px-6 md:px-0 pt-6 items-center">
          <div>
            <h1 className=" text-lg md:text-2xl font-bold">MY NFTs</h1>
          </div>
          <div>
            <h1 className=" text-md md:text-xl">Total Bought : {availbleNfts} NFTs</h1>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginTop: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",

              marginBottom: 10,
              padding: "10px", // Add some padding for spacing
            }}
          >
            {/* <div className="border border-gray-200 flex bg-white rounded-md gap-4 w-[80%] md:w-[40%] items-center p-2">
              <i>
                <CiSearch />
              </i>
              <input
                placeholder={t("Search")}
                className="bg-white outline-none w-full rounded-md"
              />
            </div> */}
          </div>
        </div>
        <div className="   py-12  w-full px-6 grid  grid-cols-2  xl:grid-cols-4 md:grid-cols-2 gap-5 md:gap-12">
          {allNfts
            ?.slice(pagesVisited, pagesVisited + usersPerPage)
            ?.map((item, index) => {
              return (
                <>
                  <MyCard
                    image={item?.image} id={item?.id}
                    description={
                      "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    }
                  />
                </>
              );
            })}
        </div>

{availbleNfts>32?(
        <div className="">
        <ReactPaginate
          previousLabel={t("Previous")}
          nextLabel={t("Next")}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>

):(null)}

      </div>
    </div>
  );
};

export default MyNfts;
