import { useEffect, useState } from "react";
import { PaginationNav } from "../../../components/pagination/pagination";
import RowTableTechStack from "./row-table-tech-stack";
import firebase from "../../../services/firebase";
const queryString = require("query-string");
export const TableTechStack = () => {
    const [ListTechStack, setListTechStack] = useState([]);
    const [page, setPage] = useState(1);
    const getDataTechStack = async () => {
        const ref = firebase.database().ref("techStack");
        ref.on("value", (snapshot) => {
            setListTechStack({data: snapshot.val()})
        });
    };
    useEffect(() => {
        getDataTechStack();
    }, [page]);
    const handelChangePage = e => {
        const numberPage = e;
        setPage(numberPage);
    };
    return (
        <div className="h-96 sm:w-full">
            <div className="sm:w-full sm:flex sm:flex-col sm:items-center">
                <table className="flex-col shadow-xl flex justify-center sm:w-11/12 bg-white w-11/12 rounded-xl">
                    <thead>
                        <tr className=" flex w-full sm:w-full bg-indigo-700 justify-around text-white rounded-t-xl cursor-pointer hover:bg-indigo-600">
                            <th className="pt-5 pb-5 w-1/12">No.</th>
                            <th className="pt-5 pb-5 w-2/12 text-left">Name</th>
                            <th className="pt-5 pb-5 w-2/12 lg:hidden sm:hidden text-left">Description</th>
                            <th className="pt-5 pb-5 w-1/12 lg:w-2/12 sm:w-2/12">Status</th>
                        </tr>
                    </thead>
                    {ListTechStack.data &&
                        ListTechStack.data.map(techStack => {
                            return (
                                <RowTableTechStack
                                    link={"/category/tech-stack/" + techStack._id}
                                    key={techStack._id}
                                    number={techStack.index + 1}
                                    type={techStack.name}
                                    description={techStack.description}
                                    status={techStack.status}
                                />
                            );
                        })}
                </table>
                <PaginationNav
                    page={page}
                    totalPage={ListTechStack.totalPage}
                    onChange={handelChangePage}
                />
            </div>
        </div>
    );
};
