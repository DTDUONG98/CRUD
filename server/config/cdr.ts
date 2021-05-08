export default {
  1: {
    result: [
      { label: "PENDING", value: 10, values: [10], chargeable: 0 },
      { label: "CWL", value: 1, values: [1], chargeable: 0 },
      { label: "CBL", value: 2, values: [2], chargeable: 0 },
      { label: "SPNR", value: 3, values: [3], chargeable: 0 },
      { label: "SPDNC", value: 4, values: [4], chargeable: 0 },
      { label: "IPTNR", value: 5, values: [5], chargeable: 0 },
      { label: "IPTDNC", value: 6, values: [6], chargeable: 0 },
      { label: "GOVNR", value: 7, values: [7], chargeable: 1 },
      { label: "GOVDNC", value: 8, values: [8], chargeable: 1 }
    ],
    columns: [
      { header: 'Record ID', key: 'id' },
      { header: 'Start Time', key: 'startTime' },
      { header: 'End Time', key: 'endTime' },
      { header: 'Svc Provider', key: 'svcProviderName' },
      { header: 'Group ID', key: 'groupCode' },
      { header: 'Group Name', key: 'groupName' },
      { header: 'A-Party', key: 'aParty' },
      { header: 'B-Party', key: 'bParty' },
      { header: 'Screening Result', key: 'resultLabel' },
      { header: 'Charging Indicator', key: 'chargeableLabel' }
    ],
    table: {
      width: 1600
    }
  },
  2: {
    result: [
      { label: "CWL", value: 1, values: [1], chargeable: 0 },
      { label: "CBL", value: 2, values: [2], chargeable: 0 },
      { label: "SPNR", value: 3, values: [3], chargeable: 0 },
      { label: "SPDNC", value: 4, values: [4], chargeable: 0 },
      { label: "NR", value: 5, values: [5, 7], chargeable: 1 },
      { label: "DNC", value: 6, values: [6, 8], chargeable: 1 }
    ],
    columns: [
      { header: 'Record ID', key: 'id' },
      { header: 'Start Time', key: 'startTime' },
      { header: 'End Time', key: 'endTime' },
      { header: 'Svc Provider', key: 'svcProviderName' },
      { header: 'Group ID', key: 'groupCode' },
      { header: 'Group Name', key: 'groupName' },
      { header: 'A-Party', key: 'aParty' },
      { header: 'B-Party', key: 'bParty' },
      { header: 'Screening Result', key: 'resultLabel' },
      { header: 'Charging Indicator', key: 'chargeableLabel' }
    ],
    table: {
      width: 1600
    }
  },
  3: {
    result: [
      { label: "CWL", value: 1, values: [1], chargeable: 0 },
      { label: "CBL", value: 2, values: [2], chargeable: 0 },
      { label: "NR", value: 5, values: [3, 5, 7], chargeable: 1 },
      { label: "DNC", value: 6, values: [4, 6, 8], chargeable: 1 }
    ],
    columns: [
      { header: 'Record ID', key: 'id' },
      { header: 'Start Time', key: 'startTime' },
      { header: 'A-Party', key: 'aParty' },
      { header: 'B-Party', key: 'bParty' },
      { header: 'Screening Result', key: 'resultLabel' }
    ],
    table: {
      width: 900
    }
  },
  4: {
    result: [
      { label: "CWL", value: 1, values: [1], chargeable: 0 },
      { label: "CBL", value: 2, values: [2], chargeable: 0 },
      { label: "NR", value: 5, values: [3, 5, 7], chargeable: 1 },
      { label: "DNC", value: 6, values: [4, 6, 8], chargeable: 1 }
    ],
    columns: [
      { header: 'Record ID', key: 'id' },
      { header: 'Start Time', key: 'startTime' },
      { header: 'A-Party', key: 'aParty' },
      { header: 'B-Party', key: 'bParty' },
      { header: 'Screening Result', key: 'resultLabel' }
    ],
    table: {
      width: 900
    }
  },
}
