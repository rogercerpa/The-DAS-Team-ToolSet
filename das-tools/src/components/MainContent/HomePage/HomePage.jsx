import React from 'react'
import Link from '@material-ui/core/Link';
import TriageHeader from "../TriageTool/TriageHeader/TriageHeader"


function HomePage() {

    const preventDefault = (event) => event.preventDefault();
    return (
        <div>
            <Link href={TriageHeader} onClick={preventDefault}>TriageTools</Link>
        </div>
    )
}

export default HomePage
