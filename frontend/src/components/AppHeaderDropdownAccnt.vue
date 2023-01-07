// FIXME: This component routes automatically to home page when clicked on dropdown item

<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Account
      </CDropdownHeader>
      <CDropdownItem
      >
        <router-link to="/settings" style="text-decoration: none; color: inherit;">
          <CIcon icon="cil-settings" /> Settings 
        </router-link>
      </CDropdownItem>
      <CDropdownItem> 
        <router-link to="/pages/login" style="text-decoration: none; color: inherit;">
          <CIcon icon="cil-lock-locked" /> Logout 
        </router-link>
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/2.jpg'
export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
    }
  },
}
</script>
