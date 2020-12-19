import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * @summary Handle both state and refs of a modal and it's trigger:
 * Toggles the isModalOpen state between true and false
 * Handles Ref focus for trigger and target when the state changes
 * Sets the isModalOpen state to false when the 'ESC' key is down
 * Optional: A click event listener sets isModalOpen to false if a click occurs outside the container
 *
 * @param {String} modalId container id
 * @returns [
 *      isModalOpen, boolean
 *      toggleModal, function toggles isModalOpen
 *      handleEscapeKey, function sets isModalOpen to false when exc key is pressed
 *      triggerRef, React Ref for trigger button when modal closes
 *      targetRef, React Ref for a target to focus when modal opens
 *   ]
 */
export default function useModalAccess(modalId, isOpen = false) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen)
  const triggerRef = useRef(null)
  const targetRef = useRef(null)
  const store = useRef({
    modal: null,
    canFocus: false,
    isOpen: false,
  })

  useEffect(() => {
    document.addEventListener('click', outsideClick)
    return () => document.removeEventListener('click', outsideClick)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!isModalOpen && store.current.canFocus) {
      triggerRef.current && triggerRef.current.focus()
    } else if (isModalOpen) {
      targetRef.current && targetRef.current.focus()
    }
    // eslint-disable-next-line
  }, [isModalOpen])

  // Pass a boolean to skip the toggle and persist new state
  function toggleModal(e) {
    const isOpen = typeof e !== 'boolean' ? !isModalOpen : e
    store.current.canFocus = true
    store.current.isOpen = isOpen
    setIsModalOpen(isOpen)

    if (!store.current.modal) {
      store.current.modal = document.getElementById(modalId)
    }
  }

  function outsideClick({ target }) {
    if (
      store.current.isOpen &&
      target.id !== modalId &&
      target !== triggerRef.current &&
      !triggerRef.current.contains(target) &&
      !store.current.modal.contains(target)
    ) {
      toggleModal(false)
    }
  }

  function handleEscapeKey(e) {
    if (store.current.isOpen && e.keyCode === 27) {
      toggleModal(false)
    }
  }

  return [isModalOpen, toggleModal, handleEscapeKey, triggerRef, targetRef]
}

useModalAccess.propTypes = {
  modalId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
}
