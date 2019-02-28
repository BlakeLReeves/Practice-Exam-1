import * as React from 'react';



export default class Home extends React.Component<IHomeProps, IHomeState> {

    constructor(props: IHomeProps) {
        super(props);

        this.state = {};
    }

    async componentWillMount() {

    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron">
                            <h1 className="display-3 text-info text-center">Welcome to The Bookstore!</h1>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

interface IHomeProps {

}

interface IHomeState { }