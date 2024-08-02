import React from 'react'
import useFetch from '../../hooks/useFetch';

const Notification = () => {
  const [data, loading] = useFetch(`/notifications/all`);

  return (
    <div>

    </div>
  )
}

export default Notification
