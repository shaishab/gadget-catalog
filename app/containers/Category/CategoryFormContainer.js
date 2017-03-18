import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { createCategory, updateCategory, fetchCategory, resetCategoryState } from '../../actions/CategoryActions';
import CategoryConstants from '../../constants/CategoryConstants';
import CategoryForm from '../../components/Category/CategoryForm';

const mapStateToProps = (state, ownProps) => {
    return {
        categoryId: ownProps.id,
        form: `${ownProps.form}CategoryForm`,
        submitButtonText: ownProps.submitButtonText || 'Submit'
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCategory: (formData) => {
            dispatch(createCategory(formData)).then(result => {
                const { type, payload } = result.action;

                console.info(payload.data);
            });
        },
        updateCategory: (formData, itemId) => {
            dispatch(updateCategory(formData, itemId));
        },
        fetchCategory: (itemId) => {
            dispatch(fetchCategory(itemId));
        },
        resetCategoryState: () => {
            dispatch(resetCategoryState());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
