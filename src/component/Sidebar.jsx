import React from 'react'
import { FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa'

const Sidebar = ({ selectedTab, setSelectedTab }) => {
    console.log(selectedTab);
    return (
        <div className="sidebar">
            <div onClick={() => setSelectedTab("INBOX")} className={selectedTab === "INBOX" ? "active" : ""}>
                <FaInbox className="icons" />
                Inbox</div>
            <div onClick={() => setSelectedTab("TODAY")} className={selectedTab === "TODAY" ? "active" : ""}>
                <FaRegCalendarAlt className="icons" />
                Today</div>
            <div onClick={() => setSelectedTab("NEXT_7")} className={selectedTab === "NEXT_7" ? "active" : ""}>
                <FaRegCalendar className="icons" />
                next 7 day</div>

        </div>
    )
}

export default Sidebar
