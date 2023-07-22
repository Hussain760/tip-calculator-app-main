const Bill = document.getElementById('Bill') as HTMLInputElement

const Tip = document.querySelectorAll('.tip') as NodeListOf<HTMLButtonElement>

const Custom = document.getElementById('custom') as HTMLInputElement

const Err = document.getElementById('error') as HTMLSpanElement

const Person = document.getElementById('person') as HTMLInputElement

const Tip_Person = document.getElementById('Tip_person') as HTMLHeadingElement

const Total_Person = document.getElementById('Total_person') as HTMLHeadingElement

const Submit = document.getElementById('submit') as HTMLButtonElement

const Reset = document.getElementById('Reset') as HTMLButtonElement

let Tip_percentage = 0


Tip.forEach((tip)=> {
    tip.addEventListener('click', (e) => {
        e.preventDefault()
        Tip_percentage = parseInt(tip.value)

        Tip.forEach((tip) => {
            // @ts-ignore
            if (tip.value === e.target.value) {
                if (tip.classList.contains('Tip_onClick')) {
                    tip.classList.remove('Tip_onClick')
                } else {
                    tip.classList.add('Tip_onClick')
                }
            } else {
                tip.classList.remove('Tip_onClick')
            }
        })
    })
})

Custom.addEventListener('click', () => {
    Tip.forEach(tip => {
        tip.classList.remove('Tip_onClick')
    })
})

document.body.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        Submit.click()
    }
})

Submit.addEventListener('click', (e) => {
    e.preventDefault()

    let Bill_amount =  parseInt(Bill.value)

    let Number_of_People =  parseInt(Person.value)

    if (!Number_of_People) {
        Err.style.display = 'inline-block'
        Person.style.outline = '2px solid var(--Red)'
    } else {
        Err.style.display = 'none'
        Person.style.outline = 'none'
    }
    
    if (Custom.value) {
        Tip_percentage = parseInt(Custom.value)
    }

    const Total_Bill = Bill_amount + (Bill_amount * (Tip_percentage / 100))
    const Total_Tip = Bill_amount * (Tip_percentage / 100)
    
    const Total_Tip_Person = (Total_Tip / Number_of_People).toFixed(2)
    const Total_Bill_Person = (Total_Bill / Number_of_People).toFixed(2)

    Tip_Person.textContent = `$${Total_Tip_Person === 'NaN' ?'0.00' : Total_Tip_Person}`
    Total_Person.textContent = `$${Total_Bill_Person === 'NaN' ? '0.00' : Total_Bill_Person}`
})

Reset.addEventListener('click', () => {
    Bill.value = ''
    Tip_percentage = 0
    Custom.value = ''
    Person.value = ''
    Tip_Person.textContent = '$0.00'
    Total_Person.textContent = '$0.00'
    Tip.forEach(tip => {
        tip.classList.remove('Tip_onClick')
    })
})