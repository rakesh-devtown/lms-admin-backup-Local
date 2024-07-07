import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react';
import EditModuleModal from '../Modal/EditModuleModal';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ModuleDropdown({ onClickDelete, data }) {
    const [isModalVisible, setIsModalVisible] = useState(false);


    const handleClick = () => {
        setIsModalVisible(true);
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
    }
    return (
        <Menu as="div" className="relative inline-block text-left font-poppins">
            <div>
                <MenuButton className="">
                    <EllipsisVertical className=" h-5 w-5 text-gray-400" aria-hidden="true" />
                </MenuButton>
            </div>

            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute right-6 top-1 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <MenuItem>
                            {({ focus }) => (
                                <button
                                    onClick={handleClick}
                                    className={classNames(
                                        focus ? 'bg-gray-100 text-blue-500' : 'text-blue-500',
                                        'block px-4 py-2 text-sm',
                                    )}
                                >
                                    Edit Module
                                </button>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {({ focus }) => (
                                <button
                                    onClick={onClickDelete}
                                    className={classNames(
                                        focus ? 'bg-gray-100 text-red-400' : 'text-red-400',
                                        'block px-4 py-2 text-sm',
                                    )}
                                >
                                    Delete Module
                                </button>
                            )}
                        </MenuItem>
                        {/* <MenuItem>
                                {({ focus }) => (
                                    <div className='flex items-center justify-between'>
                                        <button
                                            className={classNames(
                                                focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block w-full px-4 py-2 text-left text-sm',
                                            )}
                                        >
                                            Move Up
                                        </button>
                                        <ChevronUp size={22} className='text-gray-700 mt-2 mx-3' />
                                    </div>
                                )}
                            </MenuItem> */}

                    </div>
                </MenuItems>
            </Transition>
            {isModalVisible && <EditModuleModal data={data} isVisible={isModalVisible} onClose={handleCloseModal} />}
        </Menu>
    )
}
