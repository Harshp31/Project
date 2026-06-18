ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

BASE = len(ALPHABET)

def encode(num: int) -> str:
    #Convert a positive integer (e.g., a DB auto-increment ID) into a Base62 string.
    if num == 0:
        return ALPHABET[0]
    
    chars = []
    while num > 0:
        num, remainder = divmod(num, BASE)
        chars.append(ALPHABET[remainder])
        
    
    return "".join(reversed(chars))


def decode(short_code: str) -> int:
    #Convert a Base62 string back into its original integer ID.
    num = 0 
    for char in short_code:
        num = num * BASE + ALPHABET.index(char)
    return num
         
    
