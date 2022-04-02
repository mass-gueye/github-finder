import React from "react";
import { useParams } from "react-router-dom";

export default function User() {
    const params = useParams()
    const {login} = params
    return <div>User: {login}</div>;
}
