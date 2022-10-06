<template>
  <tbody>
    <tr v-for="value in 5" :key="'payment-skelton' + value">
      <td class="text-center"><b-skeleton></b-skeleton></td>
      <td class="text-center"><b-skeleton></b-skeleton></td>
      <td class="text-center"><b-skeleton></b-skeleton></td>
      <td class="text-center"><b-skeleton></b-skeleton></td>
      <td class="text-center"><b-skeleton></b-skeleton></td>
    </tr>
  </tbody>
</template>