<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
</script>

<Table>
  <TableHead>
    <TableHeadCell>Sepal Length</TableHeadCell>
    <TableHeadCell>Sepal Width</TableHeadCell>
    <TableHeadCell>Petal Length</TableHeadCell>
    <TableHeadCell>Petal Width</TableHeadCell>
    <TableHeadCell>Species</TableHeadCell>
  </TableHead>
  <TableBody class="divide-y">
    <TableBodyRow>
      <TableBodyCell>5.1</TableBodyCell>
      <TableBodyCell>3.5</TableBodyCell>
      <TableBodyCell>1.4</TableBodyCell>
      <TableBodyCell>0.2</TableBodyCell>
      <TableBodyCell>setosa</TableBodyCell>
    </TableBodyRow>
    <TableBodyRow>
      <TableBodyCell>7.0</TableBodyCell>
      <TableBodyCell>3.2</TableBodyCell>
      <TableBodyCell>4.7</TableBodyCell>
      <TableBodyCell>1.4</TableBodyCell>
      <TableBodyCell>versicolor</TableBodyCell>
    </TableBodyRow>
    <TableBodyRow>
      <TableBodyCell>6.3</TableBodyCell>
      <TableBodyCell>3.3</TableBodyCell>
      <TableBodyCell>6.0</TableBodyCell>
      <TableBodyCell>2.5</TableBodyCell>
      <TableBodyCell>Species</TableBodyCell>
    </TableBodyRow>
  </TableBody>
</Table>