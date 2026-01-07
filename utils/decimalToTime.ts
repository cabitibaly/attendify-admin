const decimalToTime = (decimal: number): string => {
    const hours = Math.floor(decimal)
    const minutes = Math.round((decimal - hours) * 60)
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

export default decimalToTime