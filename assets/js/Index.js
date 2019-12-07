import React, {Component} from 'react';
import styles from './Index.scss?module';
class Index extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className={styles.hello}>Hello!</h1>
            </div>
        )
    }


}

export default Index;