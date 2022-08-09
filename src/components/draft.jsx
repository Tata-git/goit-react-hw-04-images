export class App extends Component {
  state = {
    page: 1,
    queryValue: '',
    images: [],
    status: Status.IDLE,
    imageModal: '',
    hasNextPage: false,
  };

  componentDidUpdate(_, prevState) {
    const { queryValue, page } = this.state;
    // console.log('prevState.page: ', prevState.page);
    // console.log('page: ', page);
    // console.log('prevState.queryValue: ', prevState.queryValue);
    // console.log('queryValue: ', queryValue);
    if (queryValue !== prevState.queryValue || page !== prevState.page) {
      // console.log('Изменился queryValue');

      // ---------Status.PENDING---------------
      this.setState({ status: Status.PENDING });
      // --------- fetchImages ---------------
      this.fetchImages(queryValue, page);
    }
  }

  fetchImages = (queryValue, page) => {
    console.log(page);
    console.log(queryValue);

    getImages(queryValue, page).then(data =>
      this.setState(prevState => ({
        images: [...prevState.images, ...mapperImages(data.hits)],
        status: Status.RESOLVED,
        hasNextPage: page * perPage < data.total,
      }))
    );
  };

  handleSearchBarSubmit = queryValue => {
    console.log(queryValue);
    this.setState({ queryValue, page: 1, images: [] });
  };

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = imageLargeModal => {
    this.setState({ imageModal: imageLargeModal });
  };

  closeModal = () => {
    this.setState({ imageModal: '' });
  };

  render() {
    const { images, imageModal, hasNextPage } = this.state;

    return (
      <AppStyle>
        <Searchbar onSubmitApp={this.handleSearchBarSubmit} />
        <ImageGallery images={images} onLargeImage={this.openModal} />
        {imageModal && (
          <Modal imageLargeModal={imageModal} closeModal={this.closeModal} />
        )}
        {hasNextPage && (
          <Button text="Load more" handleClick={this.incrementPage} />
        )}
      </AppStyle>
    );
  }
}
