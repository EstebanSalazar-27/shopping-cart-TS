import { useShoppingContext } from "../context/ShoppingCartContext";
import { Product, ProductList } from "../models/products";

type PaymentModalProps = {
    showConfirmModal: boolean;
    expandList: boolean;
    productsInCart: ProductList;
    totalBill: number;
}
export const PaymentModal = ({ expandList, showConfirmModal, productsInCart, totalBill }: PaymentModalProps) => {
    const { confirmPurchase, handlePurchaseProcess } = useShoppingContext()
    console.log(handlePurchaseProcess)
    return (
        <div className={`min-h-[600px] min-w-[600px]  bg-slate-100 absolute -left-[700px] transition-all shadow-lg   ${showConfirmModal ? "opacity-100 blur-0" : 'opacity-0 blur-lg'}`}>
            <div className='flex flex-col w-full '>
                <h2 className={` w-full p-2 font-bold text-white capitalize text-center ${handlePurchaseProcess.loading ? 'bg-orange-500' : 'bg-green-500'}`}>{handlePurchaseProcess.loading === true ? "payment in process" : "payment was successful"}</h2>
                <table>
                    <thead>
                        <tr className='w-full bg-sky-600 h-8 text-center '>
                            <td className='text-lg font-bold text-slate-200' colSpan={12}>Your Shopping</td>
                        </tr>
                        <tr className='text-left  '>
                            <th className='bg-slate-300 p-1'>ID</th>
                            <th className='bg-slate-300 p-1'>Product</th>
                            <th className='bg-slate-300 p-1'>Amount</th>
                            <th className='bg-slate-300 p-1'>Price/UD</th>
                        </tr>
                    </thead>

                    <tbody className=''>
                        {productsInCart.length > 0 ? productsInCart.map((product: Product) => {
                            return (
                                <tr key={product.id} className='text-left'>
                                    <td className='text-stone-800 capitalize  font-semibold'>{product.id.toString().substring(0, 10)}</td>
                                    <td className='text-stone-800 capitalize  font-semibold'>{product.name}</td>
                                    <td className='text-stone-800 capitalize  font-semibold'>{product.cantidad}</td>
                                    <td className='text-stone-800 capitalize  font-semibold'>{product.price}</td>
                                </tr>
                            )
                        })
                            :

                            <tbody>
                                <tr  >
                                    <td>Cart's empty</td>
                                </tr>
                            </tbody>
                        }
                    </tbody>
                    <tbody>
                        <tr className='absolute bottom-0 w-full  flex '>
                            <td className='bg-sky-500 font-semibold  w-full  p-2 text-slate-50   flex justify-between items-center' >Total to Pay ${totalBill}
                                {handlePurchaseProcess.isError ? <td className='bg-orange-600 text-white rounded-md transition-all  absolute bottom-16 p-2  '>{handlePurchaseProcess.errorMsg}</td> : null}
                                <td onClick={confirmPurchase} className='bg-sky-500 text-slate-100 p-2 rounded-md cursor-pointer hover:bg-sky-600 transition-colors border-2'>Confirm Purchase</td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}