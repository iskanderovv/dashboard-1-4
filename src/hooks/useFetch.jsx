import { useEffect, useState } from "react";
import axios from '../api'

const useFetch = (URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dataLoad = async () => {
      try{
        setLoading(true);
        const response = await axios(URL);
        setData(response.data?.payload);
      }
      catch(error){
        console.log(error);
      }
      finally{
        setLoading(false)
      }
    }

    dataLoad();
  }, [URL])

  return [data, loading];
}

export default useFetch
