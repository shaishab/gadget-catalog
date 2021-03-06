import { connect } from 'react-redux';
import { fetchItem, setAsActiveImage, deleteImage } from '../../actions/ItemActions';
import ItemConstants from '../../constants/ItemConstants';
import ItemImages from '../../components/Item/ItemImages';

const mapStateToProps = (state, ownProps) => {
    return {
        itemId: ownProps.id,
        activeItem: state.itemReducer.activeItem
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchItem: (itemId) => {
            dispatch(fetchItem(itemId));
        },
        setAsActiveImage: (itemId, fileId) => {
            dispatch(setAsActiveImage(itemId, fileId));
        },
        deleteImage: (itemId, fileId) => {
            if(confirm('Are you sure? The image will be deleted from the cloudinary server.')) {
                dispatch(deleteImage(itemId, fileId));
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemImages);
