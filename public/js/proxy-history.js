var transaction = {
    labels: function() {
        return {
            valueNames: [
            'transactionLabel-route',
            'transactionLabel-method',
            'transactionLabel-statusCode',
            'transactionLabel-responseSize',
            'transactionLabel-responseTime'
            ]
        }
    }
}

var historyLabels = new List('historyLabels', transaction.labels());