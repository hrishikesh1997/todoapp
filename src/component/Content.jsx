import React from 'react'
import { useState } from 'react'

import Sidebar from './Sidebar'
import Task from './Task'


const Content = () => {
    const [selectedTab, setSelectedTab] = useState("INBOX");
    return (
        <>
            <section className="content">
                <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <Task selectedTab={selectedTab} />

            </section>
        </>

    );

};

export default Content
