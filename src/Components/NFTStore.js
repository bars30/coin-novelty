import React from "react";
import { useNavigate } from 'react-router-dom';
import { Web3Storage } from 'web3.storage'
import { Helmet } from "react-helmet"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Papa from 'papaparse';
import 'react-notifications/lib/notifications.css';
import { PinataSDK } from "pinata";



const Stake = () => {

    const pinata = new PinataSDK({
        pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxNjdkNDBlMy02NmI4LTQ2MTQtYmIxZi1iNGQzOTVmMTMzZDYiLCJlbWFpbCI6Im5hci5iYXJzZWdoeWFuOTlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImI0ZGMyYzBkMGE3MzhhMjVlYmIzIiwic2NvcGVkS2V5U2VjcmV0IjoiMWY2ZmZiNjM3NmNjNGZhNDc5NTA1OTRhOTUzODllMjE3NTU5ZDlmNjBiOTFhZTI4YWMwOGQ0YTBmOGIxYjY3NyIsImV4cCI6MTc2OTg4MTI4N30.7y7hblRzH76ANMPm8iiwTZjhLmi2FjBa_mrX2IUTHw0",
        pinataGateway: "olive-rapid-owl-18.mypinata.cloud",
    });

    const navigate = useNavigate();

    const [gamesList, setGamesList] = React.useState([])

    React.useEffect(() => {
        initialize();
    }, [])

    function makeStorageClient() {
        return new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdmODc2ZDA3OTE1ZUQ2ODA3NmFhYzU3YzBhMDZlYzgwODUyNDk4QUYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mzk1NTM2OTU3NjIsIm5hbWUiOiJub3ZlbHR5In0.NgSw8KJSdxahiHYLVcWs9x5p6t_hqv-EFlkznuyAByM" })
    }
    function makeFileObjects() {
        // You can create File objects from a Blob of binary data
        // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
        // Here we're just storing a JSON object, but you can store images,
        // audio, or whatever you want!
        const obj = gamesList
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

        const files = [
            new File([blob], 'games.json')
        ]
        return files
    }
    const initialize = async () => {
        const client = makeStorageClient();
        let newestFile = "";
        const maxResults = 1;
        let response =  null; // Declare response here to ensure it's available throughout the function
        const cid = ""


        try {
        

            // ✅ Получение последнего CID
            const files = await pinata.files.list();
            console.log("Files:", files);
            console.log("Files:", files.files[0].cid);
            const cid = files.files[0].cid;
            console.log("🟠cid", cid);
            
            // ✅ Получение последнего CID

            try {
                const { data, contentType } = await pinata.gateways.get(cid);
            
                console.log("Content Type:", contentType);
                console.log("Data:", data);
                const jsonData =  data;
                setGamesList(jsonData);
                console.log("🍧🥐🍧", jsonData);
                

            } catch (error) {
                console.error("Ошибка при запросе к Pinata:", error);
            }
            
        } catch (error) {
            console.error("Ошибка при запросе к Pinata:", error);
        }
        

        try {

            



            // for await (const upload of client.list({ maxResults })) {
            //     newestFile = upload.cid;
            // }
            // let cid = "";
            // if (localStorage.getItem("cid")) {
            //     cid = localStorage.getItem("cid");
            //     console.log("🥬🥬", `https://gateway.pinata.cloud/ipfs/${cid}`);
                
            //     // response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
            //     response = await fetch("https://gateway.pinata.cloud/ipfs/bafkreid6upzot44mzk77zm7y5lek727tep7opqdjrhkmo7y7tud4j6w7em");
            // } else {
            //     // Новый URL с JSON-файлом
            //     console.log("🥬🥬", `https://gateway.pinata.cloud/ipfs/bafkreiesvfn2o4oyd4w24koe2whdqpzuixgcwum7dfxet472ba2ica3tqy`);
            //     response = await fetch("https://gateway.pinata.cloud/ipfs/bafkreid6upzot44mzk77zm7y5lek727tep7opqdjrhkmo7y7tud4j6w7em");
            // }
            // console.log(response);
            
    
            // if (!response.ok) {
            //     throw new Error("Не удалось загрузить JSON с играми из IPFS.");
            // }
    
            // Парсим JSON
            // const jsonData = await response.json();
            // console.log("Загруженные игры:", jsonData);
            // setGamesList(jsonData); // Устанавливаем данные в состояние
    
        } catch (error) {
            console.error("Ошибка при инициализации магазина:", error);
            NotificationManager.error("Ошибка при загрузке данных. Пожалуйста, попробуйте позже.", "Не удалось загрузить игры.");
        }
    };
    
    // // 🥬🥬🥬🥬
    const buyNFT = async (game) => {
        try {
            if (!game || typeof game.price === "undefined") {
                console.error("Ошибка: Цена игры не определена.");
                NotificationManager.error("Цена игры недоступна.", "Ошибка транзакции");
                return;
            }
    
            const web3 = new window.Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
    
            const priceInWei = web3.utils.toWei(game.price.toString(), "ether");
    
            const res = await web3.eth.sendTransaction({
                to: "0x962C3B2D6Decc54Bd482517c7284116160B0d84b",
                from: accounts[0],
                value: priceInWei
            });
    
            if (!res) {
                console.error("Ошибка при отправке транзакции");
                NotificationManager.error("Ошибка при покупке NFT.", "Транзакция не выполнена");
                return;
            }
    
            // Обновляем данные о владельце и цене игры
            let updatedGame = { ...game, owner: accounts[0], price: game.price + 0.2 };
            let updatedGamesList = gamesList.map(g => g.name === game.name ? updatedGame : g);
            setGamesList(updatedGamesList);
    
            // Подключение к Pinata
            const pinata = new PinataSDK({
                pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxNjdkNDBlMy02NmI4LTQ2MTQtYmIxZi1iNGQzOTVmMTMzZDYiLCJlbWFpbCI6Im5hci5iYXJzZWdoeWFuOTlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImI0ZGMyYzBkMGE3MzhhMjVlYmIzIiwic2NvcGVkS2V5U2VjcmV0IjoiMWY2ZmZiNjM3NmNjNGZhNDc5NTA1OTRhOTUzODllMjE3NTU5ZDlmNjBiOTFhZTI4YWMwOGQ0YTBmOGIxYjY3NyIsImV4cCI6MTc2OTg4MTI4N30.7y7hblRzH76ANMPm8iiwTZjhLmi2FjBa_mrX2IUTHw0",
                pinataGateway: "olive-rapid-owl-18.mypinata.cloud",
            });
    
            // Создаем объект Blob с обновленным списком игр
            const updatedGamesListJson = JSON.stringify(updatedGamesList);
            const file = new Blob([updatedGamesListJson], { type: "application/json" });
            const fileName = "games.json"; // Укажите имя файла для загрузки
    
            // Загружаем файл в Pinata
            try {
                const upload = await pinata.upload.file(file, fileName);
                console.log("Файл загружен в Pinata:", upload);
    localStorage.setItem("cid", upload.cid);
                NotificationManager.success("Спасибо за покупку!", "Транзакция успешна!");

                // window.location.reload()
            } catch (pinataError) {
                console.error("Ошибка при загрузке файла в Pinata:", pinataError);
                NotificationManager.error("Не удалось загрузить данные в IPFS.", "Ошибка загрузки");
            }
    
            // Обновляем UI
            setTimeout(() => {
                setGamesList([]); // Очистить список
                initialize(); // Перезагрузить данные
            }, 2500);
    
        } catch (error) {
            console.error("Ошибка в buyNFT:", error);
            NotificationManager.error("Что-то пошло не так.", "Ошибка транзакции");
        }
    };
    


    

    

    return (
        <div className="bg-bgcolor min-h-screen">
            <Helmet>
                <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js" />
            </Helmet>
            {gamesList.length > 0 ?
                <>
                    <h1 onClick={() => navigate('/')} className="text-4xl font-extrabold pt-10"><span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300 filter drop-shadow hover:drop-shadow-lg">NOVELTY - NFT STORE</span></h1><br />
                    <table className="table-auto border-collapse w-full my-6">
                        <tbody className="text-md font-normal text-white">
                            <tr className="border-b border-slate-200 py-10">
                                <th className="px-2 py-2">S. No.</th>
                                <th className="px-2 py-2">Players</th>
                                <th className="px-2 py-2">Location</th>
                                <th className="px-2 py-2">Game Link</th>
                                <th className="px-2 py-2">NFT Price</th>
                                <th className="px-2 py-2">Owned By</th>
                                <th className="px-2 py-2">Buy</th>
                            </tr>
                            {gamesList.length > 0 ? gamesList.map((game, index) =>
                                <tr className="hover:bg-slate-800 border-b border-slate-200 py-10">
                                    <td className="px-2 py-2">{index + 1}</td>
                                    <td className="px-2 py-2">{game.name}</td>
                                    <td className="px-2 py-2">{game.place}</td>
                                    <td className="px-2 py-2"><a href={game.url} target="_blank" className="text-blue-600">Click To Open</a></td>
                                    <td className="px-2 py-2">{game.price}</td>
                                    <td className="px-2 py-2">0xFE41bEcF3017775cA14E74bd778c2b13a5C67649</td>
                                    <td className="px-2 py-2">
                                        <button onClick={() => buyNFT(game)} className="text-white text-lg font-medium rounded-xl px-8 py-2 bg-gradient-to-r from-amber-600 to-amber-300 hover:from-amber-700 hover:to-amber-500 hover:shadow-2xl">Buy</button>
                                    </td>
                                </tr>
                            ) : <></>}
                        </tbody>
                    </table>
                </>
                :
                <div className="flex h-screen">
                    <div className="m-auto">
                        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300 filter drop-shadow hover:drop-shadow-lg pb-8 animate-pulse">Loading NFT Store...</h1>
                    </div>
                </div>
            }
            <NotificationContainer />
        </div >
    );
};

export default Stake;