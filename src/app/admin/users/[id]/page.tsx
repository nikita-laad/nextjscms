import Link from "next/link"

const Details = () => {
  return (
    <div 
        className="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-5 dark:bg-gray-800 dark:border-gray-700"
    >
        <div className="flex justify-between">
            <h5 
                className="text-xl font-medium text-gray-900 dark:text-white"
            >
                Usrer Details
            </h5>
            <div>
                <Link 
                    href={`/admin/users/1/edit`} 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Edit
                </Link>
                <Link 
                    href={`/admin/users`} 
                    className=' px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3'
                >
                    Back
                </Link>
            </div>
                
       </div>
       
        <div 
            className="grid grid-cols-3 gap-4 mb-4"
        >
            <div className="mb-2">
                <label 
                    htmlFor="name" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Name
                </label>
                <p>Name</p>
            </div>
            <div className="mb-2">
                <label 
                    htmlFor="email" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Email
                </label>
                <p>admin@fxbytes.com</p>
            </div>
            <div className="mb-2">
                <label 
                    htmlFor="mobile" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Mobile
                </label>
               <p>909876543</p>
            </div>  
        </div>
        <div 
            className="grid grid-cols-3 gap-4 mb-4"
        >
            
           
            <div className="mb-2">
                <label 
                    htmlFor="status" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Status
                </label>
                <p>Active</p>
                
            </div>  
        </div>
    </div>
  )
}

export default Details
