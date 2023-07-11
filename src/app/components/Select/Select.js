import styles from './Select.module.css'

export default function Select({label, options, selected, onSelectChange}){
    return (
        <div>
            <label className={styles.label}>{label}</label>
            <select className={styles.selection} value = {selected} onChange={e => onSelectChange(e)}>
                {options.map((option, i) =>
                    (<option 
                        key={i} 
                        value ={option.value} 
                    > 
                        {option.label}
                    </option>)
                )}
                
            </select>
        </div>
    )
}