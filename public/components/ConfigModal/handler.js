(function() {
  function closeModal() {
    profileData.userData.adminEdited = false;
    router.goProfile();
  }

  window.closeModal = closeModal;
})();
