import React from "react";
import { useSelector } from "react-redux";
import { Card, Typography } from "antd";
import 'antd/dist/reset.css';

const { Title, Text } = Typography;

const DashboardProfile = () => {
  const user = useSelector((state) => state.user);

  console.log(user);

  return (
    <div className="mx-auto my-6 p-8 border rounded-lg shadow-lg bg-white">
      <Title level={2} className="mb-5 text-xl">User Info</Title>
      <div className="flex gap-5 flex-col">
        <div className="w-36 h-36 flex items-center justify-center rounded-full bg-gray-200">
          <span className="text-gray-600 text-3xl">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="ml-4 flex-1">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Text className="text-[#808080]">FIRSTNAME:</Text>
              <Card className="bg-[#f8f8fa] text-[#323232] uppercase rounded-md mt-2">
                {user.first_name}
              </Card>
            </div>
            <div>
              <Text className="text-[#808080]">USERNAME:</Text>
              <Card className="bg-[#f8f8fa] text-[#323232] uppercase rounded-md mt-2">
                {user.username}
              </Card>
            </div>
            <div>
              <Text className="text-[#808080]">PASSWORD:</Text>
              <Card className="bg-[#f8f8fa] text-[#323232] uppercase rounded-md mt-2">
                ***
              </Card>
            </div>
            <div>
              <Text className="text-[#808080]">ID:</Text>
              <Card className="bg-[#f8f8fa] text-[#323232] uppercase rounded-md mt-2">
                {user._id}
              </Card>
            </div>
            <div>
              <Text className="text-[#808080]">ROLE:</Text>
              <Card className="bg-[#f8f8fa] text-[#323232] uppercase rounded-md mt-2">
                {user.role}
              </Card>
            </div>
            <div>
              <Text className="text-[#808080]">LIKED:</Text>
              <Card className="bg-[#f8f8fa] text-[#323232] uppercase rounded-md mt-2" >
                {user.liked.length}
              </Card>
            </div>
            <div>
              <Text className="text-[#808080]">PURCHASED:</Text>
              <Card className="bg-[#f8f8fa] text-[#323232] uppercase  rounded-md mt-2">
                {user.purchased.length}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
