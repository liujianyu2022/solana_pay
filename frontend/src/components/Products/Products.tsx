import { useRef } from 'react'
import NumberInput from '../NumberInput/NumberInput'
import { useNavigate } from 'react-router-dom'

interface Props {
    enabled: boolean
}

export const products = [
    {
        id: 'box-of-cookies',
        name: 'Box',
        description: 'A delicious box of handmade cookies',
        unitName: 'box', // shows after the price, eg. 0.05 SOL/box
        priceSol: 0.05,
        priceUsd: 5,
    },
    {
        id: 'basket-of-cookies',
        name: 'Basket',
        description: 'A large basket of handmade cookies',
        unitName: 'basket',
        priceSol: 0.1,
        priceUsd: 10,
    }
]

export default function Products({ enabled }: Props) {

    const numberInputRef1 = useRef<{getInfo: ()=>{name: string, priceUsd: number, priceSol: number, number: number}}>(null)
    const numberInputRef2 = useRef<{getInfo: ()=>{name: string, priceUsd: number, priceSol: number, number: number}}>(null)

    const navigate = useNavigate()

    const goToCheckout = (event: any) => {
        event.preventDefault()

        const info1 = numberInputRef1.current?.getInfo()
        const info2 = numberInputRef2.current?.getInfo()

        navigate("/checkout", {
            state: [info1, info2]
        })
    }

    return (
        <form>
            <div className="flex flex-col gap-16">
                <div className="grid grid-cols-2 gap-8">
                    {products.map((product, index) => {
                        return (
                            <div className="rounded-md bg-white p-8 text-left" key={product.id}>
                                <h3 className="text-2xl font-bold">{product.name}</h3>
                                <p className="text-sm text-gray-800">{product.description}</p>
                                <p className="my-4">
                                    <span className="mt-4 text-xl font-bold">${product.priceUsd} / SOL {product.priceSol} </span>
                                    <span className="text-sm text-gray-800">/ {product.unitName}</span>
                                </p>
                                <div className="mt-1">
                                    <NumberInput name={product.id} priceSol={product.priceSol} priceUsd={product.priceUsd} ref={index === 0 ? numberInputRef1 : numberInputRef2} />
                                </div>
                            </div>
                        )
                    })}
                </div>

                <button
                    className="max-w-fit items-center self-center rounded-md bg-gray-900 px-20 py-2 text-white hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!enabled}
                    onClick={(event) => goToCheckout(event)}
                >
                    Checkout
                </button>
            </div>
        </form>
    )
}