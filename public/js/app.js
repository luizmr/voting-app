class ProductList extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // define state
    //     // this.state shoudl be treated as immutable
    //     this.state = {
    //         products: [],
    //     };

    //     // bind this to the method
    //     this.handleProductUpVote = this.handleProductUpVote.bind(this);
    // }

    // we can define state outside constructor
    state = {
        products: [],
    };

    componentDidMount() {
        // setState -> re-render which is essential after the state changes
        // component will mount with an empty state this.state.products array
        // after mounting, it will populate the state with data from Seed
        this.setState({ products: Seed.products });
        // it is a bad practice modifying this.state outiside of setState
    }

    // arrow functions already binds this -> no need for constructor
    // upvote click function
    handleProductUpVote = (productId) => {
        // map creates a new array
        const nextProducts = this.state.products.map((product) => {
            if (product.id === productId) {
                // takes product and refresh with the new votes
                return Object.assign({}, product, {
                    votes: product.votes + 1,
                });
            } else {
                // returns unmodified
                return product;
            }
        });
        // setState used to update the state
        this.setState({
            products: nextProducts,
        });
    };

    render() {
        // reordena a array de acordo com os votos
        // if it returns a negative value, the value in a will be ordered before b.
        // if it returns 0, the ordering of a and b won’t change.
        // if it returns a positive value, the value in b will be ordered before a.
        // a - b -> ascendig order
        // b - a => descending order
        const products = this.state.products.sort((a, b) => b.votes - a.votes);

        // aplica o map na nova array reordenada
        const productComponents = products.map((product) => (
            <div className="ui unstackable items">
                <Product
                    key={"product-" + product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    url={product.url}
                    votes={product.votes}
                    submitterAvatarUrl={product.submitterAvatarUrl}
                    productImageUrl={product.productImageUrl}
                    onVote={this.handleProductUpVote}
                />
            </div>
        ));

        return <div className="ui unstackable items">{productComponents}</div>;
    }
}

class Product extends React.Component {
    // constructor(props) {
    //     // chama primeiro
    //     super(props);

    //     // custom method bindings here
    //     // when defining custom methods, we must perform binding pattern inside
    //     // constructor(), so that "this" references our component
    //     this.handleUpVote = this.handleUpVote.bind(this);
    // }

    // if we write the function as an arrow function, there is no need for constructor
    // it binds this
    handleUpVote = () => {
        this.props.onVote(this.props.id);
    };
    render() {
        return (
            <div className="item">
                <div className="image">
                    <img src={this.props.productImageUrl} />
                </div>
                <div className="middle aligned content">
                    <div className="header">
                        <a onClick={this.handleUpVote}>
                            <i className="large caret up icon" />
                        </a>
                        {this.props.votes}
                    </div>
                    <div className="description">
                        <a href={this.props.url}>{this.props.title}</a>
                        <p>{this.props.description}</p>
                    </div>
                    <div className="extra">
                        <span>Submitted by:</span>
                        <img
                            className="ui avatar image"
                            src={this.props.submitterAvatarUrl}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<ProductList />, document.getElementById("content"));
