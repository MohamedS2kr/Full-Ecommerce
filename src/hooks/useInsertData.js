import baseUrl from '../Api/baseURL'

//دي عشلان خاطر لما اجي ابعت اي داتا فيها صور 
const useInsertDataWithImage = async (url, parmas) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }//ده علشان خاطر اوضحله اني مش بس هبعت نص لا دنا هبعت صور كمان
    const res = await baseUrl.post(url, parmas, config);
    return res;
}
//دي عشلان خاطر لما اجي ابعت اي داتا مافيهاش صور 

const useInsertData = async (url, parmas) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    const res = await baseUrl.post(url, parmas, config);
 
    return res;
}

export { useInsertData, useInsertDataWithImage };