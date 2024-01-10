"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { Card, CardBody } from "@nextui-org/react";
import useSWR from "swr";
import ProfileTab from "./ProfileTab";
import Loading from "@/app/loading";
import Error from "@/app/error";
export default function UsersTab() {
  const session = useSession();

  const [user, setUser] = useState({});

  const fetcher = async () => {
    const response = await axios.get("/api/users");
    return response.data;
  };
  // Get categories data from server with SWR
  const { data: users, error, isLoading } = useSWR("users", fetcher);

  if (error) return <Error />;
  if (isLoading) return <Loading />;
  return (
    <>
      <section className="mt-5 w-full mx-auto font-semibold">
        <Card shadow="lg" disableAnimation="true" className="bg-green-100">
          <CardBody>
            <p className="text-center font-bold text-xl">Users</p>
          </CardBody>
        </Card>
      </section>

      <section className="max-w-full mx-auto mt-8">
        <div className="p-2  h-44 overflow-auto border">
          {users?.length > 0 &&
            users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-1 hover:bg-red-50"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                  <div className="hidden md:block  text-gray-900">
                    {user?.name ? (
                      <span>{user.name}</span>
                    ) : (
                      <span className="italic">No name</span>
                    )}
                  </div>
                  <span className="text-gray-500 text-xs md:text-sm">{user.email}</span>
                </div>
                <Button color="danger" onPress={() => setUser(user)} size="sm">
                  Edit
                </Button>
              </div>
            ))}
        </div>
      </section>

      <ProfileTab user={user} />
    </>
  );
}
