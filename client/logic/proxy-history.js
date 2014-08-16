var transaction = {
    labels: function() {
        return {
            valueNames: [
            'transactionLabel-route',
            'transactionLabel-method',
            'transactionLabel-satusCode',
            'transactionLabel-responseSize',
            'transactionLabel-responseTime'
            ],
            plugins: [ ListFuzzySearch() ]
        }
    }
}

var historyLabels = new List('historyLabels', transaction.labels());