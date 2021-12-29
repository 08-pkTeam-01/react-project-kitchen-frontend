import React from 'react';
import listErrorsStyles from './ListErrors.module.scss';

// class ListErrors extends React.Component {
//     render() {
//         const errors = this.props.errors;
// if (errors) {
//     return (
//         <ul className='error-messages'>
//             {Object.keys(errors).map((key) => {
//                 return (
//                     <li key={key}>
//                         {key} {errors[key]}
//                     </li>
//                 );
//             })}
//         </ul>
//     );
//         } else {
//             return null;
//         }
//     }
// }

const ListErrors = ({errors}) => {
    return errors ? (
        <ul className='error-messages'>
            {Object.keys(errors).map((key) => {
                return (
                    <li key={key}>
                        {key} {errors[key]}
                    </li>
                );
            })}
        </ul>
    ) : null;
}

export default ListErrors;
