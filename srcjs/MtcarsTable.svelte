<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
</script>

<Table>
  <TableHead>
    <TableHeadCell>Model</TableHeadCell>
    <TableHeadCell>Miles Per Gallon</TableHeadCell>
    <TableHeadCell>Cylinders</TableHeadCell>
    <TableHeadCell>Displacement</TableHeadCell>
    <TableHeadCell>HorsePower</TableHeadCell>
  </TableHead>
  <TableBody class="divide-y">
    <TableBodyRow>
      <TableBodyCell>Mazda RX4</TableBodyCell>
      <TableBodyCell>21</TableBodyCell>
      <TableBodyCell>6</TableBodyCell>
      <TableBodyCell>160</TableBodyCell>
      <TableBodyCell>110</TableBodyCell>
    </TableBodyRow>
    <TableBodyRow>
      <TableBodyCell>Datsun 710</TableBodyCell>
      <TableBodyCell>23</TableBodyCell>
      <TableBodyCell>4</TableBodyCell>
      <TableBodyCell>108</TableBodyCell>
      <TableBodyCell>93</TableBodyCell>
    </TableBodyRow>
    <TableBodyRow>
      <TableBodyCell>AMC Javelin</TableBodyCell>
      <TableBodyCell>15</TableBodyCell>
      <TableBodyCell>8</TableBodyCell>
      <TableBodyCell>304</TableBodyCell>
      <TableBodyCell>150</TableBodyCell>
    </TableBodyRow>
  </TableBody>
</Table>